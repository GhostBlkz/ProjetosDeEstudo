package br.com.plusfit.repository;

import br.com.plusfit.model.Customer;
import br.com.plusfit.model.Enrollment;
import br.com.plusfit.model.TrainingSheet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingSheetRepository extends JpaRepository<TrainingSheet, Long> {

    List<TrainingSheet> findAll();

    TrainingSheet save(TrainingSheet trainingSheet);

    TrainingSheet findByTrainingSheetId(Long trainingSheetId);
}
