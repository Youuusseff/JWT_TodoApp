package com.wahch.todoapp.todoController;

import com.wahch.todoapp.domain.todoItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.wahch.todoapp.todoService.todoService;

import java.util.List;



@RestController
public class todoController {
    @Autowired
    private todoService todoService;
    @GetMapping("/items")
    public ResponseEntity<List<todoItem>> fetchAllTodoItems() throws Exception{
        List<todoItem> todoItems = todoService.fetchAllTodoItems();
        if(todoItems != null){
            return ResponseEntity.ok(todoItems);
        }
        throw new Exception("empty list");
    }
    @PostMapping("/register")
    public ResponseEntity<todoItem> registerItem(@RequestBody todoItem todoItem) throws Exception {
        if(todoItem != null){
            todoService.registerItem(todoItem);
            return ResponseEntity.ok(null);
        }
        throw new Exception("null item");
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable String id) throws Exception {
        todoService.deleteItem(id);
        return ResponseEntity.ok(null);
    }
}
