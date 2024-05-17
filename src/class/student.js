import dayjs from "dayjs";

class Student
{
    constructor(user)
    {
        this.name = user.name;
        this.birth = dayjs(user.birth).format('DD/MM/YYYY');
    }
}

export default Student;