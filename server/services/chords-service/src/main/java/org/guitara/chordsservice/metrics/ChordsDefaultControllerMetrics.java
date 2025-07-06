package org.guitara.chordsservice.metrics;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.springframework.stereotype.Service;

@Service
public class ChordsDefaultControllerMetrics {
  private final Counter chordsDefaultLitAll;

  public ChordsDefaultControllerMetrics(MeterRegistry meterRegistry) {
    this.chordsDefaultLitAll = Counter.builder("default.chords.list.all.requests")
            .register(meterRegistry);
  }

  public void incrementChordsDefaultListAll() {
    chordsDefaultLitAll.increment();
  }
}
