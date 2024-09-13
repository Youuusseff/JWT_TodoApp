package com.wahch.todoapp.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todoItem")
public class todoItem {
    @Id
    private String id;
    private String task;
    //private Boolean completed;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }


    public void setTask(String task) {
        this.task = task;
    }

    //public Boolean getCompleted() {
        //return completed;
   // }

    //public void setCompleted(Boolean completed) {
     //   this.completed = completed;
   // }
}
