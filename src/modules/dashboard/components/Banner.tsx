import "../styles/banner.css";

interface BannerProps {
  line1: string; // Línea superior del título
  line2: string; // Línea inferior del título
  subtitle: string; // Subtítulo bajo el título
  image: string; // Ruta de la imagen a mostrar
  altText?: string; // Texto alternativo (opcional)
}

const Banner = ({
  line1,
  line2,
  subtitle,
  image,
  altText = "Imagen del banner",
}: BannerProps) => {
  return (
    <section className="banner">
      <div className="banner-text">
        <h1>
          <span>{line1}</span>
          <span>{line2}</span>
        </h1>
        <p>{subtitle}</p>
      </div>
      <img
        src={image}
        alt={altText}
        className="banner-image"
        draggable="false"
      />
    </section>
  );
};

export default Banner;
