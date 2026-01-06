import React, { useState } from "react";
import {
  GripVertical,
  Plus,
  Trash2,
  Edit2,
  Bold,
  Italic,
  Underline,
  Type,
} from "lucide-react";

const ResumeBuilder = () => {
  const [canvasComponents, setCanvasComponents] = useState([]);
  const [editingComponent, setEditingComponent] = useState(null);
  const [editingLine, setEditingLine] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [globalFont, setGlobalFont] = useState("Arial");
  const [globalFontSize, setGlobalFontSize] = useState(16);

  const componentTemplates = [
    { id: "header", name: "Header", icon: "📋" },
    { id: "summary", name: "Summary", icon: "📝" },
    { id: "experience", name: "Experience", icon: "💼" },
    { id: "education", name: "Education", icon: "🎓" },
    { id: "skills", name: "Skills", icon: "⚡" },
    { id: "projects", name: "Projects", icon: "🚀" },
    { id: "custom", name: "Custom Section", icon: "✏️" },
  ];

  const fonts = [
    "Arial",
    "Times New Roman",
    "Georgia",
    "Verdana",
    "Courier New",
    "Helvetica",
    "Calibri",
    "Garamond",
  ];

  const getDefaultData = (type) => {
    const defaults = {
      header: {
        lines: [
          {
            text: "John Doe",
            style: {
              fontSize: 32,
              fontWeight: "bold",
              color: "#000000",
              fontFamily: globalFont,
            },
          },
          {
            text: "Software Engineer",
            style: {
              fontSize: 20,
              fontWeight: "normal",
              color: "#333333",
              fontFamily: globalFont,
            },
          },
          {
            text: "john@example.com | (123) 456-7890",
            style: {
              fontSize: 14,
              fontWeight: "normal",
              color: "#666666",
              fontFamily: globalFont,
            },
          },
        ],
      },
      summary: {
        title: {
          text: "Professional Summary",
          style: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#000000",
            fontFamily: globalFont,
          },
        },
        lines: [
          {
            text: "Passionate software engineer with 5+ years of experience in building scalable applications.",
            style: {
              fontSize: 16,
              fontWeight: "normal",
              color: "#000000",
              fontFamily: globalFont,
            },
          },
        ],
      },
      experience: {
        title: {
          text: "Experience",
          style: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#000000",
            fontFamily: globalFont,
          },
        },
        items: [
          {
            lines: [
              {
                text: "Senior Developer",
                style: {
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#000000",
                  fontFamily: globalFont,
                },
              },
              {
                text: "Tech Corp | 2020 - Present",
                style: {
                  fontSize: 14,
                  fontWeight: "normal",
                  fontStyle: "italic",
                  color: "#666666",
                  fontFamily: globalFont,
                },
              },
              {
                text: "• Led development of key features that increased user engagement by 40%",
                style: {
                  fontSize: 16,
                  fontWeight: "normal",
                  color: "#000000",
                  fontFamily: globalFont,
                },
              },
              {
                text: "• Mentored junior developers and conducted code reviews",
                style: {
                  fontSize: 16,
                  fontWeight: "normal",
                  color: "#000000",
                  fontFamily: globalFont,
                },
              },
            ],
          },
        ],
      },
      education: {
        title: {
          text: "Education",
          style: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#000000",
            fontFamily: globalFont,
          },
        },
        items: [
          {
            lines: [
              {
                text: "Bachelor of Science in Computer Science",
                style: {
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#000000",
                  fontFamily: globalFont,
                },
              },
              {
                text: "University Name | 2019",
                style: {
                  fontSize: 14,
                  fontWeight: "normal",
                  color: "#666666",
                  fontFamily: globalFont,
                },
              },
            ],
          },
        ],
      },
      skills: {
        title: {
          text: "Skills",
          style: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#000000",
            fontFamily: globalFont,
          },
        },
        lines: [
          {
            text: "JavaScript, React, Node.js, Python, SQL, MongoDB",
            style: {
              fontSize: 16,
              fontWeight: "normal",
              color: "#000000",
              fontFamily: globalFont,
            },
          },
        ],
      },
      projects: {
        title: {
          text: "Projects",
          style: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#000000",
            fontFamily: globalFont,
          },
        },
        items: [
          {
            lines: [
              {
                text: "Project Alpha",
                style: {
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#000000",
                  fontFamily: globalFont,
                },
              },
              {
                text: "A web application that streamlines project management for remote teams",
                style: {
                  fontSize: 16,
                  fontWeight: "normal",
                  color: "#000000",
                  fontFamily: globalFont,
                },
              },
              {
                text: "Tech: React, Node.js, PostgreSQL",
                style: {
                  fontSize: 14,
                  fontWeight: "normal",
                  fontStyle: "italic",
                  color: "#666666",
                  fontFamily: globalFont,
                },
              },
            ],
          },
        ],
      },
      custom: {
        title: {
          text: "Custom Section",
          style: {
            fontSize: 24,
            fontWeight: "bold",
            color: "#000000",
            fontFamily: globalFont,
          },
        },
        lines: [
          {
            text: "Add your custom content here",
            style: {
              fontSize: 16,
              fontWeight: "normal",
              color: "#000000",
              fontFamily: globalFont,
            },
          },
        ],
      },
    };
    return defaults[type];
  };

  const addComponent = (type) => {
    const newComponent = {
      id: Date.now(),
      type,
      data: getDefaultData(type),
    };
    setCanvasComponents([...canvasComponents, newComponent]);
  };

  const removeComponent = (id) => {
    setCanvasComponents(canvasComponents.filter((c) => c.id !== id));
    if (editingComponent?.id === id) {
      setEditingComponent(null);
      setEditingLine(null);
    }
  };

  const updateComponent = (id, updates) => {
    setCanvasComponents(
      canvasComponents.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
    if (editingComponent?.id === id) {
      setEditingComponent({ ...editingComponent, ...updates });
    }
  };

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    if (draggedItem === null || draggedItem === index) return;

    const items = [...canvasComponents];
    const draggedItemContent = items[draggedItem];
    items.splice(draggedItem, 1);
    items.splice(index, 0, draggedItemContent);

    setCanvasComponents(items);
    setDraggedItem(index);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const addLineToComponent = (component, pathArray) => {
    const newData = JSON.parse(JSON.stringify(component.data));
    let target = newData;

    for (let i = 0; i < pathArray.length - 1; i++) {
      target = target[pathArray[i]];
    }

    const lastKey = pathArray[pathArray.length - 1];
    const newLine = {
      text: "New line",
      style: {
        fontSize: 16,
        fontWeight: "normal",
        color: "#000000",
        fontFamily: globalFont,
      },
    };
    target[lastKey].push(newLine);

    updateComponent(component.id, { data: newData });
  };

  const addItemToComponent = (component) => {
    const newData = JSON.parse(JSON.stringify(component.data));
    const newItem = {
      lines: [
        {
          text: "New Item",
          style: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#000000",
            fontFamily: globalFont,
          },
        },
        {
          text: "Description",
          style: {
            fontSize: 16,
            fontWeight: "normal",
            color: "#000000",
            fontFamily: globalFont,
          },
        },
      ],
    };
    newData.items.push(newItem);
    updateComponent(component.id, { data: newData });
  };

  const removeLineFromComponent = (component, pathArray, lineIndex) => {
    const newData = JSON.parse(JSON.stringify(component.data));
    let target = newData;

    for (let i = 0; i < pathArray.length - 1; i++) {
      target = target[pathArray[i]];
    }

    const lastKey = pathArray[pathArray.length - 1];
    target[lastKey].splice(lineIndex, 1);

    updateComponent(component.id, { data: newData });
  };

  const removeItemFromComponent = (component, itemIndex) => {
    const newData = JSON.parse(JSON.stringify(component.data));
    newData.items.splice(itemIndex, 1);
    updateComponent(component.id, { data: newData });
  };

  const updateLine = (component, pathArray, lineIndex, updates) => {
    const newData = JSON.parse(JSON.stringify(component.data));
    let target = newData;

    for (let i = 0; i < pathArray.length - 1; i++) {
      target = target[pathArray[i]];
    }

    const lastKey = pathArray[pathArray.length - 1];
    target[lastKey][lineIndex] = { ...target[lastKey][lineIndex], ...updates };

    updateComponent(component.id, { data: newData });
  };

  const renderLine = (line, component, pathArray, lineIndex) => {
    const isEditing =
      editingLine?.componentId === component.id &&
      editingLine?.path === pathArray.join(".") &&
      editingLine?.lineIndex === lineIndex;

    return (
      <div
        key={lineIndex}
        className="group/line relative hover:bg-blue-50 px-2 py-1 rounded cursor-pointer"
        onClick={() =>
          setEditingLine({
            componentId: component.id,
            path: pathArray.join("."),
            lineIndex,
          })
        }
      >
        <p
          style={{
            fontSize: `${line.style.fontSize}px`,
            fontWeight: line.style.fontWeight,
            fontStyle: line.style.fontStyle,
            textDecoration: line.style.textDecoration,
            color: line.style.color,
            fontFamily: line.style.fontFamily,
          }}
        >
          {line.text}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeLineFromComponent(component, pathArray, lineIndex);
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/line:opacity-100 bg-red-500 text-white p-1 rounded hover:bg-red-600"
        >
          <Trash2 size={12} />
        </button>
      </div>
    );
  };

  const renderComponentContent = (component) => {
    const { type, data } = component;

    if (type === "header") {
      return (
        <div className="text-center">
          {data.lines.map((line, i) =>
            renderLine(line, component, ["lines"], i)
          )}
        </div>
      );
    }

    if (type === "summary" || type === "skills" || type === "custom") {
      return (
        <div>
          {data.title && renderLine(data.title, component, ["title"], 0)}
          <div className="mt-2">
            {data.lines.map((line, i) =>
              renderLine(line, component, ["lines"], i)
            )}
            <button
              onClick={() => addLineToComponent(component, ["lines"])}
              className="mt-2 text-blue-500 text-sm hover:underline"
            >
              + Add line
            </button>
          </div>
        </div>
      );
    }

    if (type === "experience" || type === "education" || type === "projects") {
      return (
        <div>
          {data.title && renderLine(data.title, component, ["title"], 0)}
          <div className="mt-2 space-y-4">
            {data.items.map((item, itemIdx) => (
              <div
                key={itemIdx}
                className="group/item relative border-l-2 border-gray-200 pl-4"
              >
                {item.lines.map((line, lineIdx) =>
                  renderLine(
                    line,
                    component,
                    ["items", itemIdx, "lines"],
                    lineIdx
                  )
                )}
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() =>
                      addLineToComponent(component, ["items", itemIdx, "lines"])
                    }
                    className="text-blue-500 text-sm hover:underline"
                  >
                    + Add line
                  </button>
                  <button
                    onClick={() => removeItemFromComponent(component, itemIdx)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove item
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={() => addItemToComponent(component)}
              className="w-full mt-4 p-2 border border-dashed border-blue-300 rounded text-blue-500 hover:bg-blue-50"
            >
              + Add{" "}
              {type === "experience"
                ? "Experience"
                : type === "education"
                ? "Education"
                : "Project"}
            </button>
          </div>
        </div>
      );
    }

    return null;
  };

  const renderLineEditor = () => {
    if (!editingLine) return null;

    const component = canvasComponents.find(
      (c) => c.id === editingLine.componentId
    );
    if (!component) return null;

    const pathArray = editingLine.path.split(".");
    let line;

    if (pathArray[0] === "title") {
      line = component.data.title;
    } else if (pathArray[0] === "lines") {
      line = component.data.lines[editingLine.lineIndex];
    } else if (pathArray[0] === "items") {
      const itemIdx = parseInt(pathArray[1]);
      line = component.data.items[itemIdx].lines[editingLine.lineIndex];
    }

    if (!line) return null;

    const updateCurrentLine = (updates) => {
      if (pathArray[0] === "title") {
        updateComponent(component.id, {
          data: { ...component.data, title: { ...line, ...updates } },
        });
      } else {
        updateLine(component, pathArray, editingLine.lineIndex, updates);
      }
    };

    return (
      <div className="p-4 bg-gray-50 rounded-lg space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold">Edit Line</h3>
          <button
            onClick={() => setEditingLine(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div>
          <label className="text-xs font-medium block mb-1">Text</label>
          <textarea
            value={line.text}
            onChange={(e) => updateCurrentLine({ text: e.target.value })}
            className="w-full p-2 border rounded text-sm"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-medium block mb-1">Font</label>
            <select
              value={line.style.fontFamily}
              onChange={(e) =>
                updateCurrentLine({
                  style: { ...line.style, fontFamily: e.target.value },
                })
              }
              className="w-full p-2 border rounded text-sm"
            >
              {fonts.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium block mb-1">Size</label>
            <input
              type="number"
              value={line.style.fontSize}
              onChange={(e) =>
                updateCurrentLine({
                  style: { ...line.style, fontSize: parseInt(e.target.value) },
                })
              }
              className="w-full p-2 border rounded text-sm"
              min="8"
              max="72"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium block mb-1">Color</label>
          <input
            type="color"
            value={line.style.color}
            onChange={(e) =>
              updateCurrentLine({
                style: { ...line.style, color: e.target.value },
              })
            }
            className="w-full h-10 border rounded cursor-pointer"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              updateCurrentLine({
                style: {
                  ...line.style,
                  fontWeight:
                    line.style.fontWeight === "bold" ? "normal" : "bold",
                },
              })
            }
            className={`flex-1 p-2 border rounded text-sm ${
              line.style.fontWeight === "bold"
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >
            <Bold size={16} className="mx-auto" />
          </button>
          <button
            onClick={() =>
              updateCurrentLine({
                style: {
                  ...line.style,
                  fontStyle:
                    line.style.fontStyle === "italic" ? "normal" : "italic",
                },
              })
            }
            className={`flex-1 p-2 border rounded text-sm ${
              line.style.fontStyle === "italic"
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >
            <Italic size={16} className="mx-auto" />
          </button>
          <button
            onClick={() =>
              updateCurrentLine({
                style: {
                  ...line.style,
                  textDecoration:
                    line.style.textDecoration === "underline"
                      ? "none"
                      : "underline",
                },
              })
            }
            className={`flex-1 p-2 border rounded text-sm ${
              line.style.textDecoration === "underline"
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >
            <Underline size={16} className="mx-auto" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r p-4 overflow-y-auto">
        <h2 className="text-lg font-bold mb-4">Components</h2>
        <div className="space-y-2 mb-6">
          {componentTemplates.map((template) => (
            <button
              key={template.id}
              onClick={() => addComponent(template.id)}
              className="w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-lg flex items-center gap-2 transition"
            >
              <span className="text-2xl">{template.icon}</span>
              <span className="font-medium text-sm">{template.name}</span>
            </button>
          ))}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-sm font-bold mb-3">Global Settings</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium block mb-1">
                Default Font
              </label>
              <select
                value={globalFont}
                onChange={(e) => setGlobalFont(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                {fonts.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium block mb-1">
                Default Size
              </label>
              <input
                type="number"
                value={globalFontSize}
                onChange={(e) => setGlobalFontSize(parseInt(e.target.value))}
                className="w-full p-2 border rounded text-sm"
                min="8"
                max="72"
              />
            </div>
          </div>
        </div>
      </div>

      {/* A4 Canvas */}
      <div className="flex-1 overflow-y-auto p-8 bg-gray-200">
        <div
          className="mx-auto bg-white shadow-2xl"
          style={{
            width: "794px",
            minHeight: "1123px",
            maxHeight: "1123px",
            padding: "60px",
            overflow: "hidden",
          }}
        >
          {canvasComponents.length === 0 ? (
            <div className="text-center text-gray-400 py-20">
              <p className="text-xl">
                Click components to build your A4 resume
              </p>
              <p className="text-sm mt-2">
                Page is fixed to A4 size (794 x 1123 px)
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {canvasComponents.map((component, index) => (
                <div
                  key={component.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`group relative border-2 border-transparent hover:border-blue-300 rounded p-3 transition ${
                    draggedItem === index ? "opacity-50" : ""
                  }`}
                  onClick={() => setEditingComponent(component)}
                >
                  <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 cursor-move">
                    <GripVertical className="text-gray-400" />
                  </div>
                  <div className="absolute -right-2 -top-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeComponent(component.id);
                      }}
                      className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  {renderComponentContent(component)}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit Panel */}
      {editingComponent && (
        <div className="w-80 bg-white border-l p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Editor</h2>
            <button
              onClick={() => {
                setEditingComponent(null);
                setEditingLine(null);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <div className="mb-4 p-3 bg-blue-50 rounded">
            <p className="text-sm text-gray-700">
              Click any line in your resume to edit its text, font, size, and
              styling.
            </p>
          </div>

          {renderLineEditor()}
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;
