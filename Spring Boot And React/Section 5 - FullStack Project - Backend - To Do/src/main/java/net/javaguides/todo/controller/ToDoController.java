package net.javaguides.todo.controller;

import lombok.AllArgsConstructor;
import net.javaguides.todo.dto.ToDoDto;
import net.javaguides.todo.service.ToDoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("api/todos")
@AllArgsConstructor
public class ToDoController {

    private ToDoService toDoService;

    //http://localhost:8080/api/todos
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping()
    public ResponseEntity<ToDoDto> addToDo(@RequestBody ToDoDto toDoDto) {
        ToDoDto toDoDtoSaved = toDoService.addToDo(toDoDto);
        return new ResponseEntity<>(toDoDtoSaved, HttpStatus.CREATED);
    }

    //http://localhost:8080/api/todos/1
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping("/{id}")
    public ResponseEntity<ToDoDto> getToDo(@PathVariable("id") Long id) { //("id") - Co or Khong
        ToDoDto toDoDto = toDoService.getToDo(id);
        return new ResponseEntity<>(toDoDto, HttpStatus.OK);
    }

    //http://localhost:8080/api/todos
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @GetMapping()
    public ResponseEntity<List<ToDoDto>> getAllToDo() {
        List<ToDoDto> toDos = toDoService.getAllToDo();
        //return new ResponseEntity<>(toDos, HttpStatus.OK);
        return ResponseEntity.ok(toDos);
    }

    // http://localhost:8080/api/todos/1
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<ToDoDto> updateToDo(@RequestBody ToDoDto toDoDto, @PathVariable("id") Long id) {
        ToDoDto updatedToDo = toDoService.updateToDo(toDoDto, id);
        return new ResponseEntity<>(updatedToDo, HttpStatus.OK);
    }

    //http://localhost:8080/api/todos/1
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteToDo(@PathVariable("id") Long id) {
        toDoService.deleteToDo(id);
        return ResponseEntity.ok("ToDo deleted successfully!");
    }

    // http://localhost:8080/api/todos/1/complete
    //@PatchMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/{id}/complete")
    public ResponseEntity<ToDoDto> completeToDo(@PathVariable("id") Long id) {
        ToDoDto completeToDoDto = toDoService.completeToDo(id);
        return ResponseEntity.ok(completeToDoDto);
    }

    // http://localhost:8080/api/todos/1/in-complete
    //@PatchMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    @PutMapping("/{id}/in-complete")
    public ResponseEntity<ToDoDto> inCompleteToDo(@PathVariable("id") Long id) {
        ToDoDto inCompleteToDoDto = toDoService.inCompleteToDo(id);
        return ResponseEntity.ok(inCompleteToDoDto);
    }
}
