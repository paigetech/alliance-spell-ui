function validatePyramid(spellPyramid) {
  console.log("woooo");
  // spell rules
  // if less than 4, a level must be less than the level below it
  // if 4 or greater, a level must be equal to or less than the level below it
  // a level may not be more than 2 greater than the level above it
  // if the top of your pyramid is not level 9, there should be no more than 2 spells

  // iterate through each level start counting at 0 = level 1
  let valid;
  for (let level = 0; level < spellPyramid.length; level++) {
    console.log("checking level: ", level);
    // checking 0s?
    //different requirements for level 1
    if (level > 0) {
      // not a column level
      if (spellPyramid[level - 1] > spellPyramid[level]) {
        console.log("level below is greater than level above ");
        if (
          spellPyramid[level] < 4 &&
          spellPyramid[level - 1] > spellPyramid[level]
        ) {
          console.log("first condition true");
          valid = true;
        }
      } else if (
        // a column level
        spellPyramid[level] >= 4 &&
        (spellPyramid[level - 1] > spellPyramid[level] ||
          spellPyramid[level - 1] === spellPyramid[level])
      ) {
        console.log("first second condition true");
        valid = true;
      } else {
        console.log("first condition false");
        valid = false;
      }
    } else if (level === 0) {
      // checking first level
      console.log("checking first level");

      if (spellPyramid[level] - spellPyramid[level + 1] <= 2) {
        console.log("second condition true");
        valid = true;
      } else {
        console.log("second condition false");
        valid = false;
      }
    } else {
      valid = false;
    }
    // if the top of your pyramid is not level 9, there should be no more than 2 spells:
    if (
      level < 8 &&
      level === spellPyramid.length - 1 &&
      spellPyramid.length < 9 &&
      spellPyramid[level] > 2
    ) {
      console.log("top check");
      valid = false;
    }
    // if your value is < 4 and the level above or below you is the same number, that's bad: bad mini column
    if (
      spellPyramid[level] < 4 &&
      (spellPyramid[level] === spellPyramid[level + 1] ||
        spellPyramid[level] === spellPyramid[level - 1])
    ) {
      console.log("bad mini column");
      valid = false;
    }
    // as soon as something fails, return false and stop checking
    if (valid === false) {
      return false;
    }
  }
  return valid;
}
// Exporting the component
export default validatePyramid;
