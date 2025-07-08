import { NavBar } from "@/modules/dashboard/components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, CardInfo, Search } from "../components";
import { Book, Categ2, Language, Light, User } from "../assets";
import "../styles/template.css";
import { requestApi } from "@/modules/js/resquestApi";
import Modal from "../components/Modal";

const Template = () => {
  const iconMap: Record<string, string> = {
    Materias: Book,
    Criterios: Light,
    Tecnologias: Language,
    Categorias: Categ2,
  };

  const { name } = useParams();
  const icon = name ? iconMap[name] : null;
  const concat = "Crear " + name;

  // Estado para usuarios pendientes
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados para modal y usuario seleccionado
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (name === "Aprobar Usuarios") {
      setLoading(true);
      const token = localStorage.getItem("access_token");
      requestApi({
        url: "https://projects-app-backend.onrender.com/people/admin/pending",
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
        .then((data) => {
          setPendingUsers(Array.isArray(data) ? data : []);
          setError(null);
        })
        .catch(() => {
          setError("Error al cargar usuarios pendientes");
          setPendingUsers([]);
        })
        .finally(() => setLoading(false));
    }
  }, [name]);

  // Quitar usuario de la lista tras aprobar/rechazar
  const removePendingUser = (userId: string) => {
    setPendingUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  // Abrir modal con usuario seleccionado
  const handleOpenModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Aprobar usuario
  const handleApproveUser = () => {
    const token = localStorage.getItem("access_token");
    if (!selectedUser) return;

    requestApi({
      url: `https://projects-app-backend.onrender.com/people/admin/${selectedUser.id}/approve`,
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(() => {
        removePendingUser(selectedUser.id);
      })
      .catch(() => {
        alert("Error al aprobar usuario");
      })
      .finally(() => {
        setIsModalOpen(false);
        setSelectedUser(null);
      });
  };

  // Rechazar usuario
  const handleRejectUser = () => {
    const token = localStorage.getItem("access_token");
    if (!selectedUser) return;

    requestApi({
      url: `https://projects-app-backend.onrender.com/people/admin/${selectedUser.id}/reject`,
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    })
      .then(() => {
        removePendingUser(selectedUser.id);
      })
      .catch(() => {
        alert("Error al rechazar usuario");
      })
      .finally(() => {
        setIsModalOpen(false);
        setSelectedUser(null);
      });
  };

  return (
    <>
      <NavBar />
      {name !== "Aprobar Usuarios" ? (
        <>
          <div>
            <div className="search-button-container">
              <div className="inside-control-search">
                <h2 className="st-h2">{name}</h2>
                <Search />
                <Button name={concat ?? ""} classComp="btn" />
              </div>
            </div>
            <CardInfo icon={icon ?? ""} />
            <CardInfo
              icon={icon ?? ""}
              title="Título personalizado"
              description="Descripción personalizada"
            />
            <CardInfo icon={icon ?? ""} />
          </div>
        </>
      ) : (
        <>
          <div className="search-button-container">
            <div className="inside-control-search">
              <h2 className="st-h2">{name}</h2>
              <Search />
            </div>
          </div>
          {loading && <p>Cargando usuarios pendientes...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {pendingUsers.length === 0 && !loading && !error && (
            <p>No hay usuarios pendientes de aprobación.</p>
          )}
          {pendingUsers.map((user, idx) => (
            <CardInfo
              key={user.id || idx}
              icon={User ?? ""}
              isApprobated={true}
              rol_type={user.user_type || ""}
              title={user.name + " " + user.last_name || "Usuario"}
              description={user._email || ""}
              userId={user.id}
              onActionSuccess={removePendingUser}
              onClickApprove={() => handleOpenModal(user)}
            />
          ))}

          <Modal
            isOpen={isModalOpen}
            title={`¿Aprobar o rechazar a ${selectedUser?.name}?`}
            description={
              <>
                Estás a punto de decidir sobre el{" "}
                <strong>
                  {selectedUser?.user_type === "professor"
                    ? "profesor"
                    : "estudiante"}
                </strong>{" "}
                <em>
                  {selectedUser?.name} {selectedUser?.last_name}
                </em>
                . ¿Qué deseas hacer?
              </>
            }
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleApproveUser}
            onReject={handleRejectUser}
            confirmText="Sí, aprobar"
            rejectText="Rechazar"
            cancelText="Cancelar"
          />
        </>
      )}
    </>
  );
};

export default Template;
