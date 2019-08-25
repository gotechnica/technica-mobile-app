export default validPhoneNumber (phoneNumber) => {
    // Clean spaces, dashes, and parenthesis from phone numbers
    phoneNumber = phoneNumber.replace(/-| |\(|\)/gm,"");

    var phoneRegex = RegExp('^\\d{11,}$');
    if(phoneRegex.test(phoneNumber)){
      return "+" + phoneNumber;
    }
    phoneRegex = RegExp('^\\d{10}$');
    if(phoneRegex.test(phoneNumber)){
      return "+1" + phoneNumber;
    }
    return null;
}