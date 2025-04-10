//Random passwword generator code

function generatePassword (lenght, includeLowercase, 
    includeUppercase, includeNumbers, includeSymbols ){

        const lowercaseChars = "abcdefghijklmnñopqrstuvwxyz";
        const uppercaseChars = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
        const numbersChars = "123456789";
        const symbolChars = "!·$%&/()=?¿|@#~€¬*-+";

        let allowedChars = "";
        let password = "";

        allowedChars += includeLowercase ? lowercaseChars : "";
        allowedChars += includeUppercase ? uppercaseChars : "";
        allowedChars += includeNumbers ? numbersChars : "";
        allowedChars += includeSymbols ? symbolChars : "";
        
        if (lenght <=0){
            return "(Pasword should be at least 1)";
        }if(allowedChars.length === 0){
            return "(At least 1 set of character needs to be selected)";
        }

        for (let i =0; i < lenght; i++ ){
            let randomIndex = Math.floor(Math.random() * allowedChars.length - 1);
            password +=(allowedChars[randomIndex]);
        }

        

        return `${password}`;

}

const passwordLength = 25;
const includeLowercase = true;
const includeUppercase = true;
const includeNumbers = true;
const includeSymbols = true;

const password = generatePassword(passwordLength, includeLowercase, includeUppercase,
                                    includeNumbers, includeSymbols);
console.log(`Generated password: ${password}`);
