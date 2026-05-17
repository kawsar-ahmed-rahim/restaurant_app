# TODO

## Database connection fix (ECONNREFUSED querySrv)

- [x] Update `backend/config/db.js` to validate `process.env.MONGO_URL`, add Atlas-friendly mongoose options, and improve error logging.
- [x] Update `backend/index.js` to fail loudly on DB connection errors.
- [x] Restart backend and verify logs.
- [ ] Apply Atlas-side fixes: Network Access IP allowlist + verify SRV connection string + ensure DB user credentials.
