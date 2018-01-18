const LdapAuth = require('ldapauth-fork');
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

ldap.on('error', err => {
  console.error('LdapAuth: ', err);
});

const auth = (username, password) => new Promise((resolve, reject) => {
  if (!password || !username) {
    reject({error: 'username or password are not provided '});
  }
  try {
    ldap.authenticate(username, password, (err, user) => {
      if (err) {
        reject(err);
      }
      // console.log(`ldap user is ok ${JSON.stringify(user, null, 5)}`);
      resolve(user);
    });
  } catch (e) {
    reject(e);
  }
});

module.exports = { auth };
