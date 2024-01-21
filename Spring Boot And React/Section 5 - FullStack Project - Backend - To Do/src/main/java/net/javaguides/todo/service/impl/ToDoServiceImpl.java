package net.javaguides.todo.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.todo.dto.ToDoDto;
import net.javaguides.todo.entity.ToDo;
import net.javaguides.todo.exception.ResourceNotFoundException;
import net.javaguides.todo.repository.ToDoRepository;
import net.javaguides.todo.service.ToDoService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ToDoServiceImpl implements ToDoService {

    private ToDoRepository toDoRepository;
    private ModelMapper modelMapper;

    @Override
    public ToDoDto addToDo(ToDoDto toDoDto) {
        ToDo toDo = modelMapper.map(toDoDto, ToDo.class);
        ToDo toDoSaved = toDoRepository.save(toDo);
        return modelMapper.map(toDoSaved, ToDoDto.class);
    }

    @Override
    public ToDoDto getToDo(Long id) {
        ToDo toDo = toDoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("ToDo not found with id: " + id));
        return modelMapper.map(toDo, ToDoDto.class);
    }

    @Override
    public List<ToDoDto> getAllToDo() {
        List<ToDo> toDoList = toDoRepository.findAll();
        return toDoList.stream()
                .map(toDo -> modelMapper.map(toDo, ToDoDto.class))
                .collect(Collectors.toList());
    }

    @Override
    public ToDoDto updateToDo(ToDoDto toDoDto, Long id) {
        ToDo existingToDo = toDoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ToDo not found with id: " + id));

        // Update fields of existingToDo with values from toDoDto
        existingToDo.setTitle(toDoDto.getTitle());
        existingToDo.setDescription(toDoDto.getDescription());
        existingToDo.setCompleted(toDoDto.isCompleted());
        // Add other fields if needed

        ToDo updatedToDo = toDoRepository.save(existingToDo);

        return modelMapper.map(updatedToDo, ToDoDto.class);
    }

    @Override
    public void deleteToDo(Long id) {
        ToDo existingToDo = toDoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ToDo not found with id: " + id));
        toDoRepository.deleteById(id);
    }

    @Override
    public ToDoDto completeToDo(Long id) {
        ToDo existingToDo = toDoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ToDo not found with id: " + id));
        existingToDo.setCompleted(true);
        ToDo toDoUpdated = toDoRepository.save(existingToDo);
        return modelMapper.map(toDoUpdated, ToDoDto.class);
    }

    @Override
    public ToDoDto inCompleteToDo(Long id) {
        ToDo existingToDo = toDoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("ToDo not found with id: " + id));
        existingToDo.setCompleted(false);
        ToDo toDoUpdated = toDoRepository.save(existingToDo);
        return modelMapper.map(toDoUpdated, ToDoDto.class);
    }


}
