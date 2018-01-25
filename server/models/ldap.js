const LdapAuth = require('ldapauth-fork');
const ActiveDirectory = require('activedirectory');
/*
const ldap = new LdapAuth({
  url: process.env.LDAP_URL,
  bindDN: process.env.LDAP_BIND_DN,
  bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
  searchBase: process.env.LDAP_SEARCH_BASE,
  searchFilter: '(&(objectClass=person)(sAMAccountName={{username}}))',
  reconnect: true,
  'groupSearchBase': 'OU=Personnes,DC=UNINE,DC=CH',
  'groupSearchFilter': '(member={{dn}})',
  'cache': false
});
*/

const ldap = new LdapAuth({
  url: process.env.LDAP_URL,
  bindDN: process.env.LDAP_BIND_DN,
  bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
  searchBase: process.env.LDAP_SEARCH_BASE,
  searchFilter: '(&(objectClass=person)(sAMAccountName={{username}}))',
  reconnect: true,
  'cache': false
});

const activeDirectory = new ActiveDirectory({
  'url': process.env.LDAP_URL,
  'baseDN': process.env.LDAP_SEARCH_BASE,
  'username':  process.env.LDAP_BIND_DN,
  'password': process.env.LDAP_BIND_CREDENTIALS
});

/*
ldap.on('error', err => {
  console.error('ldap.js line 36 error: ', err);
});
*/
const auth = (username, password) => new Promise((resolve, reject) => {
  if (!password || !username) {
    reject({error: 'username or password are not provided '});
  }
  try {
    ldap.authenticate(username, password, (err, user) => {
      ldap.close();
      if (err) {
        reject(err);
      }
      resolve(user);
    });
  } catch (e) {
    ldap.close();
    reject(e);
  }
});

const findUser = sAMAccountName =>
  new Promise((resolve, reject) => {
    activeDirectory.findUser(sAMAccountName, (err, user) => {
      if (err) {
        console.error('Error in LDAPClient.getUsers() - findUsers() failed with error : ', err);
        reject({ code: 500, message: 'There was an error with the LDAP request.' });
        return;
      }
      resolve(user);
    });
  });

const findUsers = (q, match) =>
  new Promise((resolve, reject) => {
    const opts = {
      baseDN: 'ou=Collaborateurs, ou=Personnes, dc=unine, dc=ch',
      attributes: ['cn', 'displayName', 'mail', 'sAMAccountName', 'department', 'title'],
      filter: match === 1 ? `cn=${q}` : `cn=*${q}*`
    };
    activeDirectory.findUsers(opts, (err, users) => {
      if (err) {
        console.error('Error in LDAPClient.getUsers() - findUsers() failed with error : ', err);
        reject({ code: 500, message: 'There was an error with the LDAP request.' });
        return;
      }
      const ldapUsers = [];
      if (users) {
        for (const p of users)
          ldapUsers.push({
            displayName: p.displayName,
            mail: p.mail,
            login: p.sAMAccountName,
            department: p.department,
            title: p.title
          });
        ldapUsers.sort(
          (p1, p2) => {
            if (p1.name > p2.name) {
              return 1;
            } else if (p1.name === p2.name) {
              return 0;
            } else {
              return -1;
            }
          }
        );
      }
      resolve(ldapUsers);
    });
  });
module.exports = { auth, findUsers, findUser };
