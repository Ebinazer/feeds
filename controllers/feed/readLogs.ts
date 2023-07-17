import { readLogData } from "../../logsEntry"

export const readLogs = async (req, res) => {
    const user = req.user

    if (user.role != 'SUPER_ADMIN') {
        res.json({ statusCode: 400, message: 'Logs Can be read By super Admin' })
    }
    else {
       const data =  await readLogData()
       res.json({statusCode: 200, logs: data})
    }
}