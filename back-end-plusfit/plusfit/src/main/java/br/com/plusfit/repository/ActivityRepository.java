package br.com.plusfit.repository;

import br.com.plusfit.model.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {

    List<Activity> findAll();

    Activity save(Activity activity);

    Activity findByActivityId(Long activityId);
}