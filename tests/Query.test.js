import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import sinon from 'sinon';
const stringify = JSON.stringify;

import {
  Query, Builder, Utils, BasicConfig,
} from 'react-awesome-query-builder';
const {
  uuid, 
  checkTree, loadTree, loadFromJsonLogic, 
  queryString, sqlFormat, mongodbFormat, jsonLogicFormat
} = Utils;
import AntdConfig from 'react-awesome-query-builder/config/antd';

//////////////////////////////////////////////////////////////////////////////////////////

const with_qb = (config, value, valueFormat, checks) => {
  const loadFn = valueFormat == 'JsonLogic' ? loadFromJsonLogic : loadTree;
  const wrapper = mount(
    <Query
      {...config}
      value={checkTree(loadFn(value, config), config)}
      renderBuilder={render_builder}
    />
  );
  checks(wrapper);
  wrapper.unmount();
};

const render_builder = (props) => (
    <div className="query-builder-container" style={{padding: '10px'}}>
        <div className="query-builder qb-lite">
            <Builder {...props} />
        </div>
    </div>
);

const empty_value = {id: uuid(), type: "group"};

const do_export_checks = (config, value, valueFormat, expects) => {
  const loadFn = valueFormat == 'JsonLogic' ? loadFromJsonLogic : loadTree;
  const tree = checkTree(loadFn(value, config), config);
  
  if (expects) {
    it('should work to query string', () => {
      const res = queryString(tree, config);
      expect(res).to.equal(expects["query"]);
      const res2 = queryString(tree, config, true);
      expect(res2).to.equal(expects["queryHuman"]);
    });

    it('should work to SQL', () => {
      const res = sqlFormat(tree, config);
      expect(res).to.equal(expects["sql"]);
    });

    it('should work to MongoDb', () => {
      const res = mongodbFormat(tree, config);
      expect(res).to.eql(expects["mongo"]);
    });

    it('should work to JsonLogic', () => {
      const {logic, data, errors} = jsonLogicFormat(tree, config);
      const safe_logic = JSON.parse(JSON.stringify(logic));
      expect(safe_logic).to.eql(expects["logic"]);
      expect(errors).to.eql([]);
    });
  } else {
    const {logic, data, errors} = jsonLogicFormat(tree, config);
    const correct = {
      query: queryString(tree, config),
      queryHuman: queryString(tree, config, true),
      sql: sqlFormat(tree, config),
      mongo: mongodbFormat(tree, config),
      logic: logic,
    };
    console.log(stringify(correct, undefined, 2));
  }
  
};

//////////////////////////////////////////////////////////////////////////////////////////

describe('library', () => {
  it('should be imported correctly', () => {
    expect(Query).to.exist;
    expect(Builder).to.exist;
    expect(BasicConfig).to.exist;
    expect(AntdConfig).to.exist;
  });
});

//////////////////////////////////////////////////////////////////////////////////////////

describe('basic query', () => {
  const simple_config_with_number = {
    ...BasicConfig,
    fields: {
      num: {
        label: 'Number',
        type: 'number',
        preferWidgets: ['number'],
        fieldSettings: {
          min: -1,
          max: 5
        },
      },
    },
  };

  const init_value_with_number = {
    type: "group",
    id: uuid(),
    children1: {
      [uuid()]: {
        type: "rule",
        properties: {
          field: "num",
          operator: "equal",
          value: [2],
          valueSrc: ["value"],
          valueType: ["number"]
        }
      },
    },
    properties: {
      conjunction: "AND",
      not: false
    }
  };

  const init_jl_value_with_number = {
    "and": [{
      "==": [
        { "var": "num" },
        2
      ]
    }]
  };

  describe('import', () => {
    it('should work with empty value', () => {
      with_qb(simple_config_with_number, empty_value, 'default', (qb) => {
        expect(qb.find('.query-builder')).to.have.length(1);
      });
    });

    it('should work with simple value', () => {
      with_qb(simple_config_with_number, init_value_with_number, 'default', (qb) => {
        expect(qb.find('.query-builder')).to.have.length(1);
      });
    });

    it('should work with simple value of JsonLogic format', () => {
      with_qb(simple_config_with_number, init_jl_value_with_number, 'JsonLogic', (qb) => {
        expect(qb.find('.query-builder')).to.have.length(1);
      });
    });
  });

  describe('export', () => {
    do_export_checks(simple_config_with_number, init_value_with_number, 'default', {
      query: "num == 2",
      queryHuman: "Number == 2",
      sql: "num = 2",
      mongo: {num: 2},
      logic: {
        and: [
          { '==': [{ "var": "num" }, 2] }
        ]
      },
    });
  });
});

//////////////////////////////////////////////////////////////////////////////////////////

describe('query with conjunction', () => {
  const config_with_number_and_string = {
    ...BasicConfig,
    fields: {
      num: {
        label: 'Number',
        type: 'number',
        preferWidgets: ['number'],
        fieldSettings: {
          min: -1,
          max: 5
        },
      },
      login: {
        type: 'text',
        excludeOperators: ['proximity'],
        mainWidgetProps: {
          valueLabel: "Login",
          valuePlaceholder: "Enter login",
          validateValue: (val, fieldDef) => {
            return (val.length < 10 && (val == "" || val.match(/^[A-Za-z0-9_-]+$/) !== null));
          },
        },
      }
    },
  };

  const init_jl_value_with_number_and_string = {
    "or": [{
      "<": [
        { "var": "num" },
        2
      ]
    }, {
      "==": [
        { "var": "login" },
        "ukrbublik"
      ]
    }]
  };


  describe('import', () => {
    it('should work with simple value of JsonLogic format', () => {
      with_qb(config_with_number_and_string, init_jl_value_with_number_and_string, 'JsonLogic', (qb) => {
        expect(qb.find('.query-builder')).to.have.length(1);
      });
    });
  });

  describe('export', () => {
    do_export_checks(config_with_number_and_string, init_jl_value_with_number_and_string, 'JsonLogic', {
      query: '(num < 2 || login == "ukrbublik")',
      queryHuman: '(Number < 2 OR login == "ukrbublik")',
      sql: '(num < 2 OR login = \'ukrbublik\')',
      mongo: {
        "$or": [
          { "num": {"$lt": 2} },
          { "login": "ukrbublik" }
        ]
      },
      logic: {
        "or": [
          {
            "<": [ {"var": "num"}, 2 ]
          }, {
            "==": [ {"var": "login"}, "ukrbublik" ]
          }
        ]
      },
    });
  });

});

//////////////////////////////////////////////////////////////////////////////////////////

describe('query with subquery', () => {
  const config_with_date_and_time = {
    ...BasicConfig,
    fields: {
      date: {
        label: 'Date',
        type: 'date',
      },
      time: {
        label: 'Time',
        type: 'time',
      },
      datetime: {
        label: 'DateTime',
        type: 'datetime',
      },
    },
  };

  const init_jl_value_with_date_and_time = {
    "or": [
      {
        "==": [
          {
            "var": "datetime"
          },
          "2020-05-18T21:50:01.000Z"
        ]
      },
      {
        "and": [
          {
            "==": [
              {
                "var": "date"
              },
              "2020-05-18T21:00:00.000Z"
            ]
          },
          {
            "==": [
              {
                "var": "time"
              },
              3000
            ]
          }
        ]
      }
    ]
  };


  describe('import', () => {
    it('should work with simple value of JsonLogic format', () => {
      with_qb(config_with_date_and_time, init_jl_value_with_date_and_time, 'JsonLogic', (qb) => {
        expect(qb.find('.query-builder')).to.have.length(1);
      });
    });
  });

  describe('export', () => {
    do_export_checks(config_with_date_and_time, init_jl_value_with_date_and_time, 'JsonLogic', {
      "query": "(datetime == \"2020-05-19 00:50:01\" || (date == \"2020-05-19\" && time == \"00:50:00\"))",
      "queryHuman": "(DateTime == \"19.05.2020 00:50\" OR (Date == \"19.05.2020\" AND Time == \"00:50\"))",
      "sql": "(datetime = '2020-05-19 00:50:01.000' OR (date = '2020-05-19' AND time = '00:50:00'))",
      "mongo": {
        "$or": [
          {
            "datetime": "2020-05-19 00:50:01"
          },
          {
            "date": "2020-05-19",
            "time": "00:50:00"
          }
        ]
      },
      "logic": {
        "or": [
          {
            "==": [
              {
                "var": "datetime"
              },
              "2020-05-18T21:50:01.000Z"
            ]
          },
          {
            "and": [
              {
                "==": [
                  {
                    "var": "date"
                  },
                  "2020-05-18T21:00:00.000Z"
                ]
              },
              {
                "==": [
                  {
                    "var": "time"
                  },
                  3000
                ]
              }
            ]
          }
        ]
      }
    });
  });
});

//////////////////////////////////////////////////////////////////////////////////////////

