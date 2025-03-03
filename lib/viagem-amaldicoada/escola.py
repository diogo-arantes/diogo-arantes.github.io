# Classe Escola
class Escola:
    def __init__(self, nome):
        self.nome = nome
        self.turmas = []  # Lista de turmas
        self.professores = []  # Lista de professores

    def adicionar_turma(self, turma):
        self.turmas.append(turma)

    def adicionar_professor(self, professor):
        self.professores.append(professor)

# Classe Turma
class Turma:
    def __init__(self, nome):
        self.nome = nome
        self.professores = []  # Lista de professores da turma
        self.alunos = []  # Lista de alunos da turma

    def adicionar_professor(self, professor):
        self.professores.append(professor)

    def adicionar_aluno(self, aluno):
        self.alunos.append(aluno)

# Classe Professor
class Professor:
    def __init__(self, nome, idade, disciplina):
        self.nome = nome
        self.idade = idade
        self.disciplina = disciplina

# Classe Aluno
class Aluno:
    def __init__(self, nome, idade):
        self.nome = nome
        self.idade = idade
        self.notas = {}  # Dicionário de notas por disciplina
        self.frequencia = {}  # Dicionário de frequência por disciplina

    def adicionar_nota(self, disciplina, nota):
        if disciplina not in self.notas:
            self.notas[disciplina] = []
        self.notas[disciplina].append(nota)

    def calcular_media(self, disciplina):
        if disciplina in self.notas and self.notas[disciplina]:
            return sum(self.notas[disciplina]) / len(self.notas[disciplina])
        return 0

    def registrar_presenca(self, disciplina):
        if disciplina not in self.frequencia:
            self.frequencia[disciplina] = 0
        self.frequencia[disciplina] += 1