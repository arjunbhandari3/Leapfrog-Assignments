let profile = {
  name: "Arjun Bhandari",
  address: "Madhyabindu-13,Nawalpur",
  emails: ["arjunbhandari3773@gmail.com", "ab02241517@student.ku.edu.np"],
  interests: ["coding", "music", "cricket"],
  education: [
    {
      name: "Kathmandu University, School of Engineering",
      enrolledDate: "2017-08-17",
    },
    {
      name: "Morgan International College",
      enrolledDate: "2015-07-15",
    },
    {
      name: "Nawalpur Secondary School",
      enrolledDate: "2005-04-17",
    },
  ],
};

profile.education.forEach((value) => {
  var date = new Date(value.enrolledDate);
  console.log(`Name: ${value.name}, Date: ${date.getFullYear()}`);
});
