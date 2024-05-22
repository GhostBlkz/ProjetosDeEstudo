package br.com.plusfit.repository;

import br.com.plusfit.model.Customer;
import br.com.plusfit.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    List<Enrollment> findAll();

    Enrollment save(Enrollment enrollment);

    Enrollment findByEnrollmentId(Long enrollmentId);
}
