# Debug Session: admin-login-mongo

Status: OPEN

## Symptom
- Frontend `POST /api/admin/login` returns `503` in production.
- User wants MongoDB Atlas connected and unnecessary fallback/debug logic removed.

## Hypotheses
1. Render does not have the intended `MONGODB_URI` value.
2. MongoDB Atlas network access or credentials reject Render.
3. Admin seed data is missing in the target database.
4. Frontend/backend env or CORS mismatch is masking the real auth result.
5. Temporary fallback logic created inconsistent runtime behavior.

## Evidence To Collect
- Current backend Mongo connection flow.
- Current admin login route behavior.
- Local runtime result with the updated `.env`.
- Whether admin seed runs successfully against Atlas.

## Next Step
- Inspect current backend code and verify local runtime against Atlas before further cleanup.
