package br.gov.pe.serratalhada.ceam.domain.entity;

import br.gov.pe.serratalhada.ceam.domain.enums.StatusAtendimento;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "atendimentos")
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Atendimento {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String protocolo;

    @Column(nullable = false)
    private LocalDateTime dataAtendimento;

    @Column(columnDefinition = "TEXT")
    private String relatoVitima;

    @Column(columnDefinition = "TEXT")
    private String providenciasTomadas;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusAtendimento status = StatusAtendimento.ABERTO;

    @Column(length = 50)
    private String tipoAtendimento = "Psicológico"; // 'Psicológico', 'Social', 'Jurídico'

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mulher_id", nullable = false)
    private Mulher mulher;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vinculo_agressor_id")
    private VinculoAgressor vinculoAgressor;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "atendimento_tipo_violencia",
        joinColumns = @JoinColumn(name = "atendimento_id"),
        inverseJoinColumns = @JoinColumn(name = "tipo_violencia_id"))
    private List<TipoViolencia> tiposViolencia;

    @PrePersist
    protected void onCreate() {
        if (this.dataAtendimento == null) {
            this.dataAtendimento = LocalDateTime.now();
        }
        if (this.status == null) {
            this.status = StatusAtendimento.ABERTO;
        }
        if (this.tipoAtendimento == null || this.tipoAtendimento.isBlank()) {
            this.tipoAtendimento = "Psicológico";
        }
    }

    public Atendimento() {}
}
