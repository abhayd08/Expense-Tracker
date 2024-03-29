import styles from "./TopExpenses.module.css";
import ExpenseTrackerContext from "../Contexts/ExpenseTrackerContext";
import { useContext } from "react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from "recharts";

const TopExpenses = () => {
  const { data, setData } = useContext(ExpenseTrackerContext);
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };

  const COLORS = ["#FF9304", "#A000FF", "#FDE006"];

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };
  return (
    <div className={styles.container}>
      <ResponsiveContainer width="85%" height="115%">
        <BarChart style={{ transform: "rotate(90deg)" }} data={data}>
          <XAxis dataKey="name" style={{ fontWeight: "bold" }} />
          <Bar
            dataKey="value"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: "top" }}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  COLORS[
                    entry.name === "Entertainment"
                      ? 0
                      : entry.name === "Food"
                      ? 1
                      : 2
                  ]
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopExpenses;
