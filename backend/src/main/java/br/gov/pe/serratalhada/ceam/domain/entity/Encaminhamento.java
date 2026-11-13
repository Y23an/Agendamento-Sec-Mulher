package br.gov.pe.serratalhada.ceam.domain.entity;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "encaminhamentos")
public class Encaminhamento {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private LocalDate dataEncaminhamento;
    @Column(columnDefinition = "TEXT") private String observacoes;

    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "atendimento_id", nullable = false) private Atendimento atendimento;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "orgao_encaminhamento_id", nullable = false) private OrgaoEncaminhamento orgaoEncaminhamento;

    public Encaminhamento() {}
}
