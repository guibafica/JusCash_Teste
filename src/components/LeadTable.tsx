import { useCallback, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { UseLead } from "../hooks/lead";

export const LeadTable = () => {
  const { leads } = UseLead();

  const initialData = [
    {
      id: "1",
      columns: [
        { id: "col-1", content: "" },
        { id: "col-2", content: "AWS Advocacia" },
        { id: "col-3", content: "" },
      ],
    },
    {
      id: "2",
      columns: [
        { id: "col-1", content: "" },
        { id: "col-2", content: "" },
        { id: "col-3", content: "Ricardo Almeida Advg" },
      ],
    },
    {
      id: "3",
      columns: [
        { id: "col-1", content: "Fernanda Soares ADV" },
        { id: "col-2", content: "" },
        { id: "col-3", content: "" },
      ],
    },
  ];

  const [data, setData] = useState(initialData);

  const handleOnDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const { source, destination } = result;

      if (source.index === destination.index) return;

      const newData = Array.from(data);
      const [moved] = newData[source.index].columns.splice(
        source.droppableId,
        1
      );
      newData[source.index].columns.splice(destination.index, 0, moved);

      setData(newData);
    },
    [data]
  );

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="overflow-x-auto p-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Cliente Potencial</th>
                <th className="py-2 px-4 border">Dados Confirmados</th>
                <th className="py-2 px-4 border">Análise do Lead</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="py-2 px-4 border" key={lead.id}>
                    {lead.name}
                  </td>
                  <td className="py-2 px-4 border"></td>
                  <td className="py-2 px-4 border"></td>
                </tr>
              ))}
              {/* {data.map((row) => (
                <tr key={lead.id}>
                  {row.columns.map((column, colIndex) => (
                    <Droppable
                      key={column.id}
                      droppableId={`${colIndex}`}
                      direction="horizontal"
                    >
                      {(provided) => (
                        <td
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="py-2 px-4 border"
                        >
                          <Draggable draggableId={column.id} index={colIndex}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {column.content}
                              </div>
                            )}
                          </Draggable>
                          {provided.placeholder}
                        </td>
                      )}
                    </Droppable>
                  ))}
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </DragDropContext>
    </>
  );
};
