package br.com.plusfit.repository;

import br.com.plusfit.model.Admin;
import br.com.plusfit.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    List<Admin> findAll();

    Admin save(Admin admin);

    Admin findByAdminId(Long adminId);
}
