1. In this lesson, you created a middleware function called asyncWrapper. Why?

The asyncWrapper middleware reduces on repeated code for having a try catch wrapped around our DB model calls (which handles thrown errors, such as when an invalid ID is provided in an `/:id` path).

2. Suppose that you want to make sure that both a status code and an error message are sent back to the user when they request the URL for a task that does not exist. Assume that you’ve created a CustomAPIError class and an error handler that references that class. Complete the code:

```javascript
const getTask = asyncWrapper(async (req, res, next) => {
	const { id: taskID } = req.params;
	const task = await Task.findOne({ _id: taskID });
	if (!task) {
		// assuming errorHandler exists,
		// and takes a message and HTTP status code as parameters
		next(errorHandler(`No task with id: ${taskID}`, 404));
		return;
	}
	res.status(200).json({ task });
});
```
