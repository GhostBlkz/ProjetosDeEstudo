package br.com.plusfit.service;

import br.com.plusfit.controller.TrainingSheetController;
import br.com.plusfit.controller.request.TrainingSheetRequestDto;
import br.com.plusfit.model.Customer;
import br.com.plusfit.model.TrainingSheet;
import br.com.plusfit.repository.CustomerRepository;
import br.com.plusfit.repository.TrainingSheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TrainingSheetService {

    @Autowired
    private TrainingSheetRepository trainingSheetRepository;

    @Autowired
    private CustomerRepository customerRepository;

    public TrainingSheet save(final TrainingSheetRequestDto trainingSheetRequestDto, Long customerId) {
        Customer customer = customerRepository.getById(customerId);
        TrainingSheet trainingSheet = new TrainingSheet(trainingSheetRequestDto, customer);
        return this.trainingSheetRepository.save(trainingSheet);
    }

    public List<TrainingSheet> findAll() {
        return this.trainingSheetRepository.findAll();
    }

    public TrainingSheet findById(Long trainingSheetId) {
        Optional<TrainingSheet> trainingSheetOptional = this.trainingSheetRepository.findById(trainingSheetId);
        return trainingSheetOptional.orElse(null);
    }

    public TrainingSheet update(final TrainingSheetRequestDto trainingSheetRequestDto, Long trainingSheetId) {
        TrainingSheet trainingSheet = trainingSheetRepository.findByTrainingSheetId(trainingSheetId);

        if (trainingSheetRequestDto.getName() != null) {
            trainingSheet.setName(trainingSheetRequestDto.getName());
        }

        trainingSheet.setUpdateDate(LocalDateTime.now());

        return this.trainingSheetRepository.save(trainingSheet);
    }

    public void inactive(final Long trainingSheetId) {
        TrainingSheet trainingSheet = trainingSheetRepository.findByTrainingSheetId(trainingSheetId);
        trainingSheet.setActive(false);
        this.trainingSheetRepository.save(trainingSheet);
    }
}
