// components/sections/MateriasSection.tsx
import { Book } from "../../assets";
import { Button, CardInfo, Search } from "../../components"; // Ajusta la ruta si es necesario
import CreateModal from "../CreateModal";

type Props = {
  subjects: any[];
  loading: boolean;
  error: string | null;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSuccess: () => void;
};

const MateriasSection = ({ subjects, loading, error, isOpen, onOpen, onClose, onSuccess }: Props) => {
  return (
    <div>
      <div className="search-button-container">
        <div className="inside-control-search">
          <h2 className="st-h2">Materias</h2>
          <Search />
          <Button name="Crear Materias" classComp="btn" onClick={onOpen} />
        </div>
      </div>

      {loading && <p>Cargando materias...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && subjects.length === 0 && <p>No hay materias registradas.</p>}

      {subjects.map((subject, idx) => (
        <CardInfo key={idx} icon={Book} title={subject.name} description={subject.description} />
      ))}

      <CreateModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={onSuccess}
        title="Crear Nueva Materia"
        endpoint="https://projects-app-backend.onrender.com/subjects"
      />
    </div>
  );
};

export default MateriasSection;
