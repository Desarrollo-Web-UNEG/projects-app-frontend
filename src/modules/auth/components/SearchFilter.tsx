import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import "../styles/searchfilter.css";

// Simulación de materias con color asociado
const mockSubjects = [
  { id: 1, name: "Desarrollo Web", color: "#841d37" },
  { id: 2, name: "Base de Datos", color: "#1b4f72" },
  { id: 3, name: "Sistemas Distribuidos", color: "#117864" },
  { id: 4, name: "Redes de Computadoras", color: "#884ea0" },
];

const SearchFilter = () => {
  const [search, setSearch] = useState("");
  const [subjects, setSubjects] = useState<typeof mockSubjects>([]);
  const [selectedSubject, setSelectedSubject] = useState<number>(1);

  useEffect(() => {
    const fetchSubjects = async () => {
      setSubjects(mockSubjects); // ← luego lo cambias por fetch
    };
    fetchSubjects();
  }, []);

  // Buscar el color según la materia seleccionada
  const selectedColor =
    subjects.find((subj) => subj.id === selectedSubject)?.color || "#841d37";

  return (
    <div className="search-filter-container">
      {/* Input de búsqueda */}
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar proyecto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon className="search-icon" fontSize="small" />
      </div>

      {/* Selector de materias con color dinámico */}
      <div
        className="subject-select-wrapper"
        style={{ backgroundColor: selectedColor }}
      >
        <select
          className="subject-select"
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(parseInt(e.target.value))}
        >
          {subjects.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
        <span className="custom-arrow">▼</span>
      </div>
    </div>
  );
};

export default SearchFilter;
