const test = async (req, res) => {
    try {
        res.status(200).json({
            "status": "true",
            "message": "all ok!"
        })
    } catch (error) {
        res.status(500).json({
            "status": "false",
            "message": error
        })
    }
}

module.exports = { test };