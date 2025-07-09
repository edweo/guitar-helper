package org.guitara.chordsservice;

import io.opentelemetry.exporter.otlp.http.trace.OtlpHttpSpanExporter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TracingConfig {

  @Value("${tracing.url}")
  private String traceUrl;

  @Bean
  public OtlpHttpSpanExporter otlpHttpSpanExporter() {
    System.out.println("Tracing URL: " + traceUrl);
    return OtlpHttpSpanExporter.builder()
            .setEndpoint(traceUrl)
            .build();
  }
}
