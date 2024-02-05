package com.dill.library.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.dill.library.entity.BookEntity;

public interface BookRepository extends JpaRepository<BookEntity, Long> {

}
