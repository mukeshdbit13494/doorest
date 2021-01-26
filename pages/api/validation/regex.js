// The domain name [for example com, org, net, in, us, info] part contains letters, digits, hyphens, and dots.
exports.regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

//forthe first and last name and all single string without any spaces
exports.regName = /^[A-Za-z]+$/;

//validation mobile number for 10 digits
exports.regMobile = /^\d{10}$/;

// password between 8 to 15 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character
exports.regPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
