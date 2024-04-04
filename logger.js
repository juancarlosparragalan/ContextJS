const serviceVars = require("service-metadata");
const hm = require("header-metadata");

session.input.readAsJSON(function (error, json) {
  if (error) {
    registerErrorLog(category, error);
  } else {
    main(json);
  }
});

function main(response) {
  const category = "logger";
  const requestHeaders = hm.original.headers;
  const responseHeaders = hm.current.headers;
  const globalTransactionId = serviceVars.getVar(
    "var://service/global-transaction-id"
  );
  const localServiceAddress = serviceVars.getVar(
    "var://service/local-service-address"
  );
  const serviceName = serviceVars.getVar("var://service/processor-name");
  const method = serviceVars.getVar("var://service/protocol-method");
  const routingUrl = serviceVars.getVar("var://service/routing-url");
  const timeElapsed = serviceVars.getVar("var://service/time-elapsed");
  const transactionClient = serviceVars.getVar(
    "var://service/transaction-client"
  );
  const URLin = serviceVars.getVar("var://service/URL-in");
  const URLout = serviceVars.getVar("var://service/URL-out");

  const log = {
    globalTransactionId,
    localServiceAddress,
    serviceName,
    method,
    routingUrl,
    timeElapsed,
    transactionClient,
    URLin,
    URLout,
    requestHeaders,
    responseHeaders,
    response,
  };

  registerLog(category, log);
}

function registerLog(logCategory, data) {
  console.options({ category: logCategory }).info(data);
}

function registerErrorLog(logCategory, data) {
  console.options({ category: logCategory }).error(data);
}
