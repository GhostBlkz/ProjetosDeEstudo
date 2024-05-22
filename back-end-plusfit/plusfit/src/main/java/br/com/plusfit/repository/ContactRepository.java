package br.com.plusfit.repository;

import br.com.plusfit.model.Contact;
import br.com.plusfit.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> findAll();

    Contact save(Contact contact);

    Contact findByContactId(Long contactId);
}
