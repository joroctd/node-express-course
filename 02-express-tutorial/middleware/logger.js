module.exports = (req, res, next) => {
	console.log(`\nA request was made:
        Protcol: ${req.protocol}
        Path: ${req.path}`);
	next();
};
