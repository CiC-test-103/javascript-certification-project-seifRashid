// Necessary Imports (you will need to use this)
const { Student } = require('./Student')



/*
 *
 * Node Class (GIVEN, you will need to use this)
 * 
 * 
 */
class Node {
  // Public Fields

  data               // Student Object
  next

  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head              // Object
  tail              // Object
  length            // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    // TODO
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(name, year, email, specialization) {
    // TODO
    let student = new Student(name, year, email, specialization)
    console.log(student)
    if (this.length === 0) {
      this.head = new Node(student, null);
      this.tail = this.head;
    } else {
      this.tail.next = new Node(student, null);
      this.tail = this.tail.next;
    }
    this.length++;
  }

  removeStudent(email) {
    /**
     * REQUIRES:  email(String)
     * EFFECTS:   Removes a student by email (assume unique)
     * RETURNS:   None
     * CONSIDERATIONS:
     * - Think about the null case
     * - Think about how removal might update head or tail
     */
    // TODO
    if (this.length === 0) {
      return;
    }
    if (this.head.data.getEmail() === email) {
      this.head = this.head.next;
      this.length--;
      return;
    }
    let current = this.head;
    while (current.next) {
      if (current.next.data.getEmail() === email) {
        current.next = current.next.next;
        this.length--;
        return;
      }
      current = current.next;
    }
  }

  findStudent(email) {
    /**
     * REQUIRES:  email (String)
     * EFFECTS:   None
     * RETURNS:   The Student or -1 if not found
     */
    // TODO
    if (this.length === 0) {
      return;
    }
    let current = this.head;
    while (current) {
      if (current.data.getEmail() === email) {
        return current.data;
      }
      current = current.next;
    }
    return -1
  }

  #clearStudents() {
    /**
     * REQUIRES:  None
     * EFFECTS:   Clears all students from the Linked List
     * RETURNS:   None
     */
    // TODO
    this.head = null;
    this.length = 0;

  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    // TODO
    if (this.length === 0) {
      return "";
    }
    let current = this.head;
    let result = [];
    while (current) {
      result.push(current.data.getName());
      current = current.next;
    }
    return result.join(", ");
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    // TODO
    let studentsArray = [];
    let current = this.head;
    while (current) {
      studentsArray.push(current.data);
      current = current.next;
    }
    return studentsArray.sort((a, b) => a.getName().localeCompare(b.getName()));

  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    let filteredStudents = this.#sortStudentsByName().filter(student => student.getSpecialization() === specialization);
    return filteredStudents;
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinAge(minAge) {
    // TODO
    let filteredStudents = this.#sortStudentsByName().filter(student => student.getAge() >= minAge);
    return filteredStudents;
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson() {
    // TODO
    const fs = require('fs').promises;
    let current = this.head;
    let data = [];
    while (current) {
      data.push(current.data);
      current = current.next;
    }
    await fs.writeFile(data.json, JSON.stringify(data, null
      , 2));
  }

  async loadFromJSON() {
    /**
     * REQUIRES:  A valid file name (String) that exists
     * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
     * the file name is called data.json and is in the same directory
     * RETURNS:   None
     * CONSIDERATIONS:
     *  - Use clearStudents() to perform overwriting
     */

    // TODO
    const fs = require('fs').promises;
    this.#clearStudents();
    let data = await fs.readFile(data.json);
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      this.addStudent(data[i]);
    }

  }

}

module.exports = { LinkedList }
