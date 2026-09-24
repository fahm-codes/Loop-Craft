const { neon } = require('@neondatabase/serverless');
const sql = neon('postgresql://neondb_owner:npg_Gz4EriOHu1wY@ep-twilight-salad-b5msr4il-pooler.c-7.us-east-2.aws.neon.tech/neondb');
sql('SELECT id, title FROM dsa_sheets').then(console.log);

