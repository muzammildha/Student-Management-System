#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class Student {

    static counter = 10000;

    id: number;

    name: string;

    courses: string[];
    
    balance: number;

    constructor(name: string) {
    
        this.id = Student.counter++;
    
        this.name = name;
    
        this.courses = [];
    
        this.balance = 100;
    }

    enrollCourse(course: string) {
    
        this.courses.push(course);
    
    }

    
    viewBalance() {
    
        console.log(`Balance for ${this.name}: ${this.balance}`);
    
    }

    
    payFees(amount: number) {
    
        this.balance -= amount;
    
        console.log(`${amount} fees paid successfully for ${this.name}`);
    
    }

    
    showStatus() {
    
        console.log(`ID = ${this.id}`);
    
        console.log(`Name = ${this.name}`);
    
        console.log(`Courses = ${this.courses.join(", ")}`);
    
        console.log(`Balance = ${this.balance}`);
    
    }

}

class StudentManager {

    students: Student[];

    constructor() {

        this.students = [];

    }

    addStudent(name: string) {

        let student = new Student(name);

        this.students.push(student);

        console.log(`Student: ${name} added successfully. Student ID: ${student.id}`);

    }

    enrollStudent(studentId: number, course: string) {

        let student = this.findStudent(studentId);

        if (student) {

            student.enrollCourse(course);

            console.log(`${student.name} enrolled in ${course} successfully`);

        } else {

            console.log("Student not found. Please enter a valid Student ID.");

        }

    }


    viewStudentBalance(studentId: number) {

        let student = this.findStudent(studentId);

        if (student) {

            student.viewBalance();

        } else {

            console.log("Student not found. Please enter a valid Student ID.");

        }

    }



    
    payStudentFees(studentId: number, amount: number) {
    
        let student = this.findStudent(studentId);
    
        if (student) {
    
            student.payFees(amount);
    
    
        } else {
    
            console.log("Student not found. Please enter a valid Student ID.");
    
        }
    
    }



    showStudentStatus(studentId: number) {
    
        let student = this.findStudent(studentId);
    
        if (student) {
    
            student.showStatus();
    
        } else {
    
            console.log("Student not found. Please enter a valid Student ID.");
    
        }
    
    }

    
    findStudent(studentId: number) {
    
        return this.students.find(student => student.id === studentId);
    
    }

}



async function main() {

    console.log("=".repeat(60));

    console.log("Student Management System");

    console.log("=".repeat(60));


    let studentManager = new StudentManager();


    while (true) {

        let choice = await inquirer.prompt([

            {

                name: "choice",

                type: "list",

                message: "Select an option",

                choices: [

                    "Add student",

                    "Enroll Student",

                    "View Student Balance",

                    "Pay Fees",

                    "Show Status",

                    "Exit"

                ]
            }
        ]);

        switch (choice.choice) {

            case "Add student":

            let inputName = await inquirer.prompt([

                {

                    name: "Name",

                    type: "input",

                    message: "Please input the name"

                }

            ]);

            studentManager.addStudent(inputName.Name);

            break;



            case "Enroll Student":
            
            let courseInput = await inquirer.prompt([
            
            
            
            
                {
            
                    name: "student_id",
            
            
                    type: "number",
            
                    message: "Enter a student ID"
            
            
                },
            
            
                {
                        name: "course",
            
                        type: "input",
            
                        message: "Enter a course name you want to enroll in"
            
                    }
            
                ]);
            
                studentManager.enrollStudent(courseInput.student_id, courseInput.course);
            
                break;


            case
            
            "View Student Balance":
            
            let balanceInput = await inquirer.prompt([
            
                    {
            
                        name: "student_id",
            
                        type: "number",
            
                        message: "Please enter Student ID"
            
                    }
            
                ]);
            
            
                studentManager.viewStudentBalance(balanceInput.student_id);
                
                break;


            case "Pay Fees":
                
            let feesInput = await inquirer.prompt([
            
                {
            
                    name: "student_id",
            
                    type: "number",
            
                    message: "Enter a student ID"
            
                },
            
                {
            
                    name: "amount",
            
                    type: "number",
            
                    message: "Enter amount to pay"
            
                }
            
            ]);
            
            studentManager.payStudentFees(feesInput.student_id, feesInput.amount);
            
            break;


            
            case "Show Status":
            
            let statusInput = await inquirer.prompt([
            
                {
            
                    name: "student_id",
            
                    type: "number",
            
                    message: "Enter a student ID"
            
                }
            
            ]);
            
            studentManager.showStudentStatus(statusInput.student_id);
            
            break;


            
            case "Exit":
                console.log("Exiting...");
            
                process.exit();
        }


    }

}



main();

