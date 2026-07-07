# Auth Testing Playbook (BloomNest AI)

## Step 1: Create test user + session in MongoDB
```
mongosh --eval "
use('test_database');
var userId = 'test-user-' + Date.now();
var sessionToken = 'test_session_' + Date.now();
db.users.insertOne({
  user_id: userId,
  email: 'test.user.' + Date.now() + '@example.com',
  name: 'Test Mother',
  picture: 'https://via.placeholder.com/150',
  created_at: new Date().toISOString()
});
db.user_sessions.insertOne({
  user_id: userId,
  session_token: sessionToken,
  expires_at: new Date(Date.now() + 7*24*60*60*1000).toISOString(),
  created_at: new Date().toISOString()
});
print('SESSION_TOKEN=' + sessionToken);
print('USER_ID=' + userId);
"
```

## Step 2: Test backend endpoints
```
curl -H "Authorization: Bearer $TOKEN" $URL/api/auth/me
curl -H "Authorization: Bearer $TOKEN" $URL/api/dashboard/summary
curl -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
  -d '{"kind":"feeding","title":"Morning feed"}' $URL/api/baby/events
```

## Step 3: Browser testing
```
await page.context.add_cookies([{
  "name": "session_token",
  "value": TOKEN,
  "domain": "family-genius.preview.emergentagent.com",
  "path": "/",
  "httpOnly": True,
  "secure": True,
  "sameSite": "None"
}]);
await page.goto(URL + "/app");
```
