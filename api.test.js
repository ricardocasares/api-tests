const supertest = require("supertest");
const fixture = require(`./fixtures/${process.env.NODE_ENV}`);

if (!fixture) {
  throw new Error(`Fixture not found for env: ${process.env.NODE_ENV}`);
}

function api() {
  if (fixture.url) {
    return supertest(fixture.url);
  }

  return supertest(require("./app"));
}

function testEnv(env, ...params) {
  if (env.includes(process.env.NODE_ENV)) {
    return it(...params);
  }

  return it.skip(...params);
}

const allEnvs = ["test", "preview", "production"];
const onlyTestEnv = ["test"];
const testAndPreviewEnvs = ["test", "preview"];

testEnv(allEnvs, "should return list of users", async () =>
  api().get("/users").expect(200)
);

testEnv(testAndPreviewEnvs, "should return a specific user", async () =>
  api().get(`/users/${fixture.userId}`).expect(200)
);

testEnv(onlyTestEnv, "should delete a user", async () =>
  Promise.all([
    api().delete(`/users/${fixture.userId}`).expect(204),
    api().get(`/users/${fixture.userId}`).expect(404),
  ])
);
