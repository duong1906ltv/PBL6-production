// Format : dd/mm/yyyy
export const getDate = (datetime) => {
    return datetime.split("T")[0].split("-").reverse().join("/")
}

// Format : HH:mm
export const getTime = (datetime) => {
    const [hour, minute] = datetime.split("T")[1].split(":");
    return `${hour}:${minute}`
}

// Format : dd/mm/yyyy HH:mm
export const getDateTime = (datetime) => {
    return `${getDate(datetime)}  ${getTime(datetime)}`
}

export const getDay = (datetime) => {
    return datetime.split("T")[0].split("-")[2]
}

export const getMonth = (datetime) => {
    return datetime.split("T")[0].split("-")[1]
}

export const getYear = (datetime) => {
    return datetime.split("T")[0].split("-")[0]
}


 