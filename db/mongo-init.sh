set -e

mongosh <<EOF
use addresses

db.createUser({
  user: 'user_addr',
  pwd: '12345',
  roles: [{ role: 'readWrite', db: 'addresses' }]
})
EOF