export function getLastAgo(datetime, getMS = false){
    const tmp = datetime.split('T');
    const date = tmp[0].split('-');
    const time = tmp[1].split(':');
    const result = new Date(Date.UTC(date[0], date[1]-1, date[2], +time[0], time[1]));

    const questionDate = result.getTime()

    if(getMS) return questionDate

    const dateNow = new Date().getTime()

    let lastAgo = parseInt((dateNow - questionDate) / 60000)
    if(lastAgo <= 60){
        return `${lastAgo} минут назад`
    }
    if(lastAgo <= 1440){
        lastAgo = parseInt(lastAgo / 60)
        return `${lastAgo} часов назад`
    }
    if(lastAgo <= 43200){
        lastAgo = parseInt(lastAgo / 1800)
        return `${lastAgo} дней назад`
    }
    if(lastAgo <= 525600){
        lastAgo = parseInt(lastAgo / 43200)
        return `${lastAgo} дней назад`
    }
    lastAgo = parseInt(lastAgo / 525600)
    return `${lastAgo} дней назад`
}