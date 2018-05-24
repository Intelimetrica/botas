const fluentPromise = promise =>
  promise.then(
    solved => ({value: solved, status: "RESOLVED"}),
    rejected => ({value: rejected, status: "REJECTED"})
  );

module.exports = fluentPromise;
