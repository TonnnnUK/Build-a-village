import PeopleNames from "../dictionaries/peopleNames";

class NameController {

    constructor(){
        this.firstMaleNames = PeopleNames.firstMaleNames;
        this.firstFemaleNames = PeopleNames.firstFemaleNames;
        this.lastNames = PeopleNames.lastNames;
        this.firstName;
        this.lastName;
    }

    generate(gender){
        let genderArray = [];
        if( gender == 'male'){
            genderArray = this.firstMaleNames;
        } else {
            genderArray = this.firstFemaleNames;
        }
            
        const firstNameIndex = Math.floor(Math.random() * genderArray.length);
        const lastNameIndex = Math.floor(Math.random() * this.lastNames.length);

        const firstName = genderArray[firstNameIndex];
        const lastName = this.lastNames[lastNameIndex];

        return firstName+' '+lastName
        
    }


}

export default NameController