package net.javaguides.springboot.controller;

import net.javaguides.springboot.bean.Student;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    //http://localhost:8080/student
    @GetMapping("/student")
    public ResponseEntity<Student> getStudent() {
        Student student = new Student(
                1, "Nguyen", "Truong Giang"
        );
        //return new ResponseEntity<>(student, HttpStatus.OK);
        return ResponseEntity.ok()
                .header("customer-header", "Nguyen")
                .body(student);
    }

    //http://localhost:8080/students
    @GetMapping
    public ResponseEntity<List<Student>> getStudents() {
        List<Student> students = new ArrayList<>();
        students.add(new Student(1, "Nguyen","Dang Duc" ));
        students.add(new Student(2, "Tran","Van Hai" ));
        students.add(new Student(3, "Le","Quynh Giang" ));

        return ResponseEntity.ok(students);
    }

    //URL TEMPLATE VARIABLE
    //http://localhost:8080/student/{id}/{first-name}/{last-name}
    @GetMapping("/{id}/{first-name}/{last-name}")
    public ResponseEntity<Student> studentPathVariable(@PathVariable("id") int studentId,
                                       @PathVariable("first-name") String firstName,
                                       @PathVariable("last-name") String lastName ) {
        Student student = new Student(studentId, firstName, lastName);
        return ResponseEntity.ok(student);
    }

    //REQUEST PARAM
    //http://localhost:8080/students/query?id=1&firstName=Le&lastName=NgocAnh
    @GetMapping("/query")
    public ResponseEntity<Student> studentRequestVariable(@RequestParam int id,
                                                          @RequestParam String firstName,
                                                          @RequestParam String lastName) {
        Student student  =  new Student(id,firstName, lastName);
        return ResponseEntity.ok(student);
    }

    //POST MAPPING and @REQUESTBODY
    /*  {
          "firstName": "John",
          "lastName": "Doe"
        }
    */
    //http://localhost:8080/students/create
    @PostMapping("/create")
    //@ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        System.out.println(student.getId());
        System.out.println(student.getFirstName());
        System.out.println(student.getLastName());

        return new ResponseEntity<>(student, HttpStatus.CREATED);
    }


    //PUT MAPPING and @REQUESTBODY
      /*  {
          "firstName": "John",
          "lastName": "Doe"
        }
    */
    @PutMapping("/update/{id}")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student,@PathVariable("id") int studentId) {
        System.out.println(student.getFirstName());
        System.out.println(student.getLastName());

        return ResponseEntity.ok(student);
    }

    //DELETE MAPPING
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") int studentId ) {
        System.out.println("studentId: " + studentId);
        return ResponseEntity.ok("Student Deleted Successfully!!!");
    }



}
