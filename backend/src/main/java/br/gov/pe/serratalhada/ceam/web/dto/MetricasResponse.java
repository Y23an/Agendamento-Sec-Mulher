package br.gov.pe.serratalhada.ceam.web.dto;

import java.util.Map;

public record MetricasResponse(
    long totalMulheres,
    long totalAtendimentos,
    long totalEmAcompanhamento,
    long totalEncerrados,
    Map<String, Long> atendimentosPorTipo,
    Map<String, Long> atendimentosPorStatus,
    Map<String, Long> atendimentosPorBairro
) {}
