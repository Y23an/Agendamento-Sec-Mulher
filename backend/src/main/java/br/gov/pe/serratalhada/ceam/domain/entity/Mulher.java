package br.gov.pe.serratalhada.ceam.domain.entity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "mulheres")
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Mulher {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false) private String nome;
    @Column(nullable = false, unique = true, length = 14) private String cpf;
    @Column(length = 20) private String rg;
    private LocalDate dataNascimento;
    @Column(length = 15) private String telefone;
    private String enderecoLogradouro;
    @Column(length = 10) private String numero;
    
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "bairro_id") private Bairro bairro;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "profissao_id") private Profissao profissao;
    
    @Column(updatable = false) private LocalDateTime dataCadastro;
    private LocalDateTime atualizadoEm;

    @PrePersist protected void onCreate() {
        this.dataCadastro = LocalDateTime.now();
        this.atualizadoEm = LocalDateTime.now();
    }
    @PreUpdate protected void onUpdate() { this.atualizadoEm = LocalDateTime.now(); }

    public Mulher() {}
}
