export const splitElementsByDate = (weatherObject) => {
    let days = [[], [], [], []];
    let i=0;
    const todayDate = new Date().getDate();

    days.forEach((day)=>{
        const dateStamp = weatherObject.list.filter((elem) => {
            const date = new Date(elem.dt_txt);
            if (date.getDate() === todayDate + i) {
                return elem;
            }
        })
        day.push(dateStamp)
        i++;
    })
    return days;
}