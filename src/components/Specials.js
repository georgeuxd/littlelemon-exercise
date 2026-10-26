
const specials = [
  {
    name: "Greek Salad",
    description:
      "Crisp vegetables, Kalamata olives, creamy feta and a touch of Mediterranean herbs.",
    price: "$12.99",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
    alt: "Fresh Mediterranean salad",
  },
  {
    name: "Bruschetta",
    description:
      "Toasted bread topped with ripe tomatoes, fresh basil and extra virgin olive oil.",
    price: "$8.99",
    image:
      "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=900&q=80",
    alt: "Bruschetta with fresh toppings",
  },
  {
    name: "Lemon Dessert",
    description:
      "A delicate, refreshing dessert inspired by the bright flavor of fresh lemons.",
    price: "$6.99",
    image:
      "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=80",
    alt: "Lemon dessert",
  },
];

export default function Specials() {
  return (
    <section className="specials" id="menu">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Made fresh for you</p>
          <h2>This Week's Specials</h2>
        </div>
      </div>

      <div className="specials-grid">
        {specials.map((item) => (
          <article className="special-card" key={item.name}>
            <img src={item.image} alt={item.alt} />

            <div className="special-card-content">
              <div className="special-card-top">
                <h3>{item.name}</h3>
                <span>{item.price}</span>
              </div>

              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
